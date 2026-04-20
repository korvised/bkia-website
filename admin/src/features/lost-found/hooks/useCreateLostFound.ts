import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useCreateLostFoundMutation } from "@/features/lost-found/api";
import { alertService } from "@/services/alert.service";
import { LostFoundCategory, LostFoundType } from "@/types";
import type { ICreateLostFoundForm } from "@/features/lost-found/types";

const initialValues: ICreateLostFoundForm = {
  type: "",
  category: "",
  itemName: "",
  description: "",
  location: "",
  incidentDate: "",
  flightNumber: "",
  reporterName: "",
  reporterEmail: "",
  reporterPhone: "",
  images: [],
};

function validate(values: ICreateLostFoundForm) {
  const errors: Partial<Record<keyof ICreateLostFoundForm, string>> = {};

  if (!values.type) errors.type = "Type is required";
  if (!values.category) errors.category = "Category is required";
  if (!values.itemName) errors.itemName = "Item name is required";
  else if (values.itemName.length < 2) errors.itemName = "At least 2 characters";
  if (!values.incidentDate) errors.incidentDate = "Incident date is required";
  if (!values.reporterName) errors.reporterName = "Reporter name is required";
  else if (values.reporterName.length < 2) errors.reporterName = "At least 2 characters";
  if (values.reporterEmail && !/\S+@\S+\.\S+/.test(values.reporterEmail))
    errors.reporterEmail = "Invalid email format";
  if (!values.reporterPhone) errors.reporterPhone = "Phone number is required";
  else if (values.reporterPhone.length < 2) errors.reporterPhone = "At least 2 characters";

  return errors;
}

export function useCreateLostFound() {
  const navigate = useNavigate();
  const [createLostFound, { isLoading: isCreating }] = useCreateLostFoundMutation();

  const handleCancel = () => navigate("/support/lost-found");

  const formik = useFormik<ICreateLostFoundForm>({
    initialValues,
    validate,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("type", values.type as LostFoundType);
      formData.append("category", values.category as LostFoundCategory);
      formData.append("itemName", values.itemName);
      if (values.description) formData.append("description", values.description);
      if (values.location) formData.append("location", values.location);
      formData.append("incidentDate", values.incidentDate);
      if (values.flightNumber) formData.append("flightNumber", values.flightNumber);
      formData.append("reporterName", values.reporterName);
      if (values.reporterEmail) formData.append("reporterEmail", values.reporterEmail);
      formData.append("reporterPhone", values.reporterPhone);
      values.images.forEach((file) => formData.append("images", file));

      try {
        const result = await createLostFound(formData).unwrap();
        await alertService.success(
          "Report Created",
          `Reference code: ${result.referenceCode}`,
        );
        navigate("/support/lost-found");
      } catch {
        await alertService.error("Failed to create report. Please try again.");
      }
    },
  });

  return { formik, isCreating, handleCancel };
}
