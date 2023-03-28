import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getDirectionsResponse } from "../../../helpers/map.helper";
import {
  editTransaction,
  getTransactionById,
} from "../../../helpers/transaction.helper";
import Loading from "../../Loading";
import NewTransactionForm from "../create/NewTransactionForm";
function EditTransaction() {
  const [state, setState] = useState();
  const [directionsResponse, setDirectionsResponse] = useState();
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const getData = async () => {
    try {
      const res = await getTransactionById(transactionId);
      console.log(res);
      if (res.data?.success) {
        setState(res.data?.transaction);

        // eslint-disable-next-line no-undef
        const directions = await getDirectionsResponse(
          res.data.transaction.from_address,
          res.data.transaction.to_address
        );

        if (directions) {
          setDirectionsResponse(directions);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to receive data!");
    }
  };

  const submitData = () => {
    console.log(state);
    if (state.from_address === "") {
      setError("from_address", {
        type: "required",
        message: "Required",
      });
      return;
    }
    if (state.to_address === "") {
      setError("from_address", {
        type: "required",
        message: "Required",
      });
      return;
    }

    editTransaction(state, transactionId)
      .then((res) => {
        if (res.data?.success) {
          let id = res.data.transaction._id;
          navigate(`/view/${id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Update failed!");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (!state) {
    return <Loading />;
  }

  return (
    <section className="p-5 md:p-10">
      <h2 className="text-lg font-semibold mb-10 text-gray-700 capitalize">
        Edit transaction
      </h2>
      <NewTransactionForm
        setState={setState}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        state={state}
        submitData={submitData}
        setError={setError}
        clearErrors={clearErrors}
      />
    </section>
  );
}

export default EditTransaction;
