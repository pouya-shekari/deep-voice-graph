import Modal from "@cmp/UI/Modal";
import useModal from "@hooks/useModal";
import useSnak from "@hooks/useSnak";
import getActions from "@services/actions/getActions";
import getAnnouncements from "@services/annoucements/getAnnouncements";
import getCheckers from "@services/checkers/getCheckers";
import getQuestions from "@services/questions/getQuestions";
import convertNodeNames from "@utils/convertors/convertNodeNames";
import localStorageHelper from "@utils/localStrogeHelper";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Autocomplete, TextField } from "@mui/material";
import waitTimeValidator from "@utils/waitTimeValidator";
import NoOption from "./NoOption";
import AddChecker from "@cmp/Resources/Checker/Add";
import AddAction from "@cmp/Resources/Action/Add";
import AddAnnouncement from "@cmp/Resources/Announcement/Add";
import AddQuestion from "@cmp/Resources/Questions/Add";
import maxTryValidator from "@utils/maxTryValidator";

const AddResource = ({ selectedNode, onClear, onUpdate }) => {
  const [checkers, setCheckers] = useState(null);
  const [announcements, setAnnouncements] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [actions, setActions] = useState(null);

  const [options, setOptions] = useState([]);
  const [resource, setResource] = useState(null);

  const [waitTimeError, setWaitTimeError] = useState("");
  const [maxTryError, setMaxTryError] = useState("");

  const [type, setType] = useState(selectedNode?.type);

  const waitTimeRef = useRef();
  const maxTryRef = useRef();

  const modal = useModal();
  const { showSnak } = useSnak();
  const closeModalHandler = () => {
    modal.close();
    setResource(null);
    onClear();
  };

  const loadCheckers = useCallback(async () => {
    if (checkers) {
      return checkers;
    }
    try {
      const res = await getCheckers(
        "checker/list",
        localStorageHelper.load("token")
      );
      const data = res.map((item) => ({
        id: item.checkerId,
        label: item.text,
        responses: [],
      }));
      setCheckers([...data]);
      return data;
    } catch (error) {
      showSnak({ type: "error", message: "???????????? ?????????? ???? ?????? ?????????? ????." });
    }
  }, [checkers, showSnak]);

  const loadActions = useCallback(async () => {
    if (actions) {
      return actions;
    }
    try {
      const res = await getActions(
        "action/list",
        localStorageHelper.load("token")
      );
      const data = res.map((item) => ({
        id: item.actionId,
        label: item.text,
        responses: [],
      }));
      setActions([...data]);
      return data;
    } catch (error) {
      showSnak({ type: "error", message: "???????????? ??????????????? ???? ?????? ?????????? ????." });
    }
  }, [actions, showSnak]);

  const loadQuestions = useCallback(async () => {
    if (questions) {
      return questions;
    }
    try {
      const res = await getQuestions(
        "announcement/list",
        localStorageHelper.load("token")
      );
      const data = res.map((item) => ({
        id: item.announcementId,
        label: item.text,
        responses: [...item.responses],
      }));
      setQuestions([...data]);
      return data;
    } catch (error) {
      showSnak({ type: "error", message: "???????????? ??????????????? ???? ?????? ?????????? ????." });
    }
  }, [questions, showSnak]);

  const loadAnnouncements = useCallback(async () => {
    if (announcements) {
      return announcements;
    }
    try {
      const res = await getAnnouncements(
        "announcement/list",
        localStorageHelper.load("token")
      );
      const data = res.map((item) => ({
        id: item.announcementId,
        label: item.text,
        responses: [],
      }));
      setAnnouncements([...data]);
      return data;
    } catch (error) {
      showSnak({ type: "error", message: "???????????? ????????????????? ???? ?????? ?????????? ????." });
    }
  }, [announcements, showSnak]);

  const fetchResource = useCallback(
    async (type) => {
      const whichType = {
        Checker: loadCheckers,
        Action: loadActions,
        Question: loadQuestions,
        Announcement: loadAnnouncements,
      };
      if (!whichType[type]) {
        return;
      }
      const list = await whichType[type]();
      setOptions([...list]);
      setWaitTimeError("");
      setMaxTryError("");
      modal.show({ isAddResourceModalOpen: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadCheckers, loadActions, loadQuestions, loadAnnouncements]
  );
  useEffect(() => {
    if (!selectedNode?.type) return;
    fetchResource(selectedNode?.type);
    setType(selectedNode?.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode?.type]);

  useEffect(() => {
    fetchResource(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    actions?.length,
    announcements?.length,
    questions?.length,
    checkers?.length,
  ]);

  const validateInputs = () => {
    // TODO: need to refactor
    if (!resource) {
      if (selectedNode.data.resourceId !== undefined) {
        let index = options.findIndex(
          (item) => item.id === selectedNode.data.resourceId
        );
        if (index !== -1) {
          if (!validateWaitTime()) return;
          if (!validateMaxTry()) return;
          let resource = options[index];
          onUpdate({
            resource,
            waitTime: waitTimeRef?.current?.value,
            maxTry: maxTryRef?.current?.value,
          });
          closeModalHandler();
          return;
        } else {
          showSnak({
            type: "error",
            message: "???????? Resource ???? ???? ???????? ?????????? ???????????? ????????.",
          });
        }
      } else {
        showSnak({
          type: "error",
          message: "???????? Resource ???? ???? ???????? ?????????? ???????????? ????????.",
        });
        return;
      }
      return;
    }
    if (!validateWaitTime()) return;
    if (!validateMaxTry()) return;
    onUpdate({
      resource,
      waitTime: waitTimeRef?.current?.value,
      maxTry: maxTryRef?.current?.value,
    });
    closeModalHandler();
  };

  const validateMaxTry = () => {
    if (
      ["Checker"].includes(selectedNode?.type) &&
      !maxTryValidator(maxTryRef.current.value)
    ) {
      setMaxTryError(
        "?????????? ???????? ?????? ???????? ?????????????????. ???????? ???? ?????? ???????? ???????????? ???? 0 ???????? ????????"
      );
      return false;
    }
    return true;
  };

  const validateWaitTime = () => {
    if (
      ["Announcement", "Question"].includes(selectedNode?.type) &&
      !waitTimeValidator(waitTimeRef.current.value)
    ) {
      setWaitTimeError("???????? ???????????? ?????????? ?????????????????.");
      return false;
    }
    return true;
  };

  return (
    <>
      <AddChecker
        updateListHandler={(res) => {
          setCheckers((chr) =>
            chr.concat({ id: res.checkerId, label: res.text, responses: [] })
          );
          fetchResource(selectedNode?.type);
        }}
        onClose={() => onClear()}
      />
      <AddAction
        updateListHandler={(res) => {
          setActions((act) =>
            act.concat({ id: res.actionId, label: res.text, responses: [] })
          );
          fetchResource(selectedNode?.type);
        }}
        onClose={() => onClear()}
      />
      <AddAnnouncement
        updateListHandler={(res) => {
          setAnnouncements((ann) =>
            ann.concat({
              id: res.announcementId,
              label: res.text,
              responses: [],
            })
          );
          fetchResource(selectedNode?.type);
        }}
        onClose={() => onClear()}
      />
      <AddQuestion
        updateListHandler={(res) => {
          setQuestions((que) =>
            que.concat({
              id: res.announcementId,
              label: res.text,
              responses: [...res.responses],
            })
          );
          fetchResource(selectedNode?.type);
        }}
        onClose={() => onClear()}
      />
      <Modal
        open={modal.modalStates.isAddResourceModalOpen}
        label="add-resource-modal"
        title={"???????????? Resource ???? ??????"}
        onClose={closeModalHandler}
        description={`?????? ???? ?????? ???????????? Resource ???? ????????????? ???? ?????? ${convertNodeNames(
          type
        )} ??????????. ???????? ???????????? ???????? Resource ???? ???? ???????? ${convertNodeNames(
          type
        )}????????? ?????????? ???????????? ????????.`}
        actions={[
          {
            type: "success",
            label: "???????????? ???? ??????",
            icon: <AddIcon />,
            onClickHandler: validateInputs,
          },
          {
            type: "cancel",
            label: "????????????",
            icon: <CloseIcon />,
            onClickHandler: closeModalHandler,
          },
        ]}
      >
        <div className="mb-3">
          <Autocomplete
            options={options}
            defaultValue={
              selectedNode
                ? options.find((item) => item.label === selectedNode.data.label)
                : undefined
            }
            onChange={(event, newValue) => {
              setResource(newValue);
            }}
            noOptionsText={<NoOption type={selectedNode?.type} />}
            renderInput={(params) => {
              return (
                <TextField
                  fullWidth
                  variant="standard"
                  {...params}
                  label={`${convertNodeNames(type)}????????? ??????????`}
                />
              );
            }}
          />
        </div>
        {["Announcement", "Question"].includes(type) && type && (
          <div className="mb-3">
            <TextField
              id="wait-time"
              label="???????? ???????????? (ms)"
              type="text"
              fullWidth
              variant="standard"
              autoComplete={"off"}
              error={waitTimeError !== ""}
              helperText={waitTimeError}
              inputRef={waitTimeRef}
              defaultValue={selectedNode?.data.waitTime}
            />
          </div>
        )}
        {["Checker"].includes(type) && type && (
          <div className="mb-3">
            <TextField
              id="max-try"
              label="Max Retry"
              type="text"
              fullWidth
              variant="standard"
              autoComplete={"off"}
              error={maxTryError !== ""}
              helperText={maxTryError}
              inputRef={maxTryRef}
              defaultValue={selectedNode?.data.maxRetry}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default React.memo(AddResource);
