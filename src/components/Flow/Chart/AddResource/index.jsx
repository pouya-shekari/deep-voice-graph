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

const AddResource = ({ selectedNode, onClear, onUpdate }) => {
  const [checkers, setCheckers] = useState(null);
  const [announcements, setAnnouncements] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [actions, setActions] = useState(null);

  const [options, setOptions] = useState([]);
  const [resource, setResource] = useState(null);

  const [waitTimeError, setWaitTimeError] = useState("");

  const [type, setType] = useState(selectedNode?.type);

  const waitTimeRef = useRef();

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
      showSnak({ type: "error", message: "دریافت چکرها با خطا مواجه شد." });
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
      showSnak({ type: "error", message: "دریافت اکشن‌ها با خطا مواجه شد." });
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
      showSnak({ type: "error", message: "دریافت سوال‌ها با خطا مواجه شد." });
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
      showSnak({ type: "error", message: "دریافت اعلان‌ها با خطا مواجه شد." });
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
    if(resource === null){
      if(selectedNode.data.resourceId !== undefined){
          let index = options.findIndex(item=>item.id === selectedNode.data.resourceId)
          if(index !== -1){
            if (
                ["Announcement", "Question"].includes(selectedNode?.type) &&
                !waitTimeValidator(waitTimeRef.current.value)
            ) {
              setWaitTimeError("زمان انتظار معتبر نمی‌باشد.");
              return;
            }
            else{
              let resource = options[index]
              modal.close();
              onUpdate({ resource, waitTime: waitTimeRef?.current?.value });
              return;
            }
          }
        }
    }
    if (!resource) {
      showSnak({
        type: "error",
        message: "لطفا Resource را از لیست موجود انتخاب کنید.",
      });
      return;
    }
    if (
      ["Announcement", "Question"].includes(selectedNode?.type) &&
      !waitTimeValidator(waitTimeRef.current.value)
    ) {
      setWaitTimeError("زمان انتظار معتبر نمی‌باشد.");
      return;
    }
    modal.close();
    onUpdate({ resource, waitTime: waitTimeRef?.current?.value });
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
        title={"افزودن Resource به گره"}
        onClose={closeModalHandler}
        description={`شما در حال افزودن Resource به گره‌ای از نوع ${convertNodeNames(
          type
        )} هستید. برای افزودن لطفا Resource را از لیست ${convertNodeNames(
          type
        )}‌های موجود انتخاب کنید.`}
        actions={[
          {
            type: "success",
            label: "افزودن به گره",
            icon: <AddIcon />,
            onClickHandler: validateInputs,
          },
          {
            type: "cancel",
            label: "انصراف",
            icon: <CloseIcon />,
            onClickHandler: closeModalHandler,
          },
        ]}
      >
        <div className="mb-3">
          <Autocomplete
            options={options}
            defaultValue={selectedNode?
                options.find(item=>item.label === selectedNode.data.label)
                : undefined}
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
                  label={`${convertNodeNames(type)}‌های موجود`}
                />
              );
            }}
          />
        </div>
        {["Announcement", "Question"].includes(type) && type && (
          <div className="mb-3">
            <TextField
              id="wait-time"
              label="زمان انتظار (ms)"
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
      </Modal>
    </>
  );
};

export default React.memo(AddResource);
