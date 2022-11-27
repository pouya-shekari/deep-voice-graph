import React, { useState } from "react";
import useSWR from "swr";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Table from "@cmp/UI/Table";

import getFlows from "@services/flows/getFlows";
import lockFlow from "@services/flows/lockFlow";
import localStorageHelper from "@utils/localStrogeHelper";
import Loading from "@cmp/UI/Loading";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import useSnak from "@hooks/useSnak";
import Add from "@cmp/Flow/Add";
import useModal from "@hooks/useModal";
import Edit from "@cmp/Flow/Edit";
import updateFlow from "@services/flows/updateFlow";

const tableHeaders = [
  { title: "شناسه فلوچارت", field: "id", style: {} },
  { title: "نام انگلیسی", field: "nameEN", style: {} },
  { title: "نام فارسی", field: "nameFA", style: {} },
  {
    title: "توضیحات",
    field: "description",
    style: {
      width: "30%",
      maxWidth: 100,
      overflow: "hidden",
      textOverflow: "ellipsis",
      borderStyle: "border-box",
    },
  },
  { title: "وضعیت فلوچارت", field: "isEnable", style: {} },
];

const List = () => {
  const navigate = useNavigate();
  const { showSnak } = useSnak();
  const modal = useModal();
  const [selectedId, setSelectedId] = useState(0);

  const {
    data: flows,
    error: flowsError,
    mutate: mutateFlows,
  } = useSWR(["flow/list", localStorageHelper.load("token")], getFlows);
  if (flowsError)
    return (
      <Alert
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center", gap: "5px" }}
      >
        دریافت اطلاعات با خطا مواجه شد! لطفا اتصال اینترنت خود را بررسی نمایید.
      </Alert>
    );
  if (!flows) return <Loading />;

  const tableData = flows.map((item) => {
    return {
      ...item,
      id: item.flowId,
      isEnable: (
        <Alert
          severity={item.enable ? "success" : "error"}
          sx={{ justifyContent: "center" }}
        >
          {item.enable ? "فعال" : "غیرفعال"}
        </Alert>
      ),
    };
  });

  const enableDisableFlow = async (id) => {
    const flowToEdit = flows.find((item) => item.flowId === id);
    try {
      await lockFlow(
        `flow/enable/${flowToEdit.flowId}`,
        localStorageHelper.load("token"),
        !flowToEdit.enable
      );
      const newData = flows.map((item) => {
        if (item.flowId === id) {
          return { ...item, enable: !flowToEdit.enable };
        }
        return item;
      });
      mutateFlows([...newData], { revalidate: false });
      showSnak({
        type: "success",
        message: `فلوچارت مورد نظر با موفقیت ${
          flowToEdit.enable ? "غیرفعال" : "فعال"
        } شد.`,
      });
    } catch (error) {}
  };

  const updateList = (data) => {
    mutateFlows([...flows, data], { revalidate: false });
  };

  const showEditModal = (row) => {
    setSelectedId(row.flowId);
    modal.show({ isEditFlowModalOpen: true });
  };

  const editHandler = async (nameEN, nameFA, description) => {
    showSnak({ type: "warning", message: "در حال ویرایش فلوچارت..." });
    try {
      await updateFlow("flow/update", localStorageHelper.load("token"), {
        id: selectedId,
        nameEN,
        nameFA,
        description,
      });
      const newData = flows.map((item) => {
        if (item.flowId === selectedId) {
          return { ...item, nameEN, nameFA, description };
        }
        return item;
      });
      mutateFlows([...newData], { revalidate: false });
      showSnak({ type: "success", message: "فلوچارت با موفقیت بروز شد." });
    } catch (error) {
      showSnak({
        type: "error",
        message: "بروزرسانی فلوچارت با خطا مواجه شد.",
      });
    }
    modal.close();
  };
  return (
    <>
      <Add updateListHandler={updateList} />
      <Edit
        nameFA={flows.find((item) => item.flowId === selectedId)?.nameFA}
        nameEN={flows.find((item) => item.flowId === selectedId)?.nameEN}
        description={
          flows.find((item) => item.flowId === selectedId)?.description
        }
        onEdit={editHandler}
      />
      <Table
        type={"simple"}
        data={tableData}
        label={"flow table"}
        hasAction={true}
        tableHeaders={tableHeaders}
        onRowClick={showEditModal}
        actions={[
          {
            type: "cancel",
            icon: <RemoveRedEyeIcon />,
            label: "مشاهده فلوچارت",
            onClickHandler: (id) => {
              navigate(`/flows/${id}`);
            },
          },
          {
            type: "enable/disable",
            icon: null,
            label: "",
            onClickHandler: enableDisableFlow,
          },
        ]}
      />
    </>
  );
};

export default List;
