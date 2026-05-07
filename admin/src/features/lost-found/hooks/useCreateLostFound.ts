import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useCreateLostFoundMutation } from "@/features/lost-found/api";
import { alertService } from "@/services/alert.service";
import { LostFoundCategory } from "@/types";
import type { ICreateLostFoundForm, IMultilingualFormField } from "@/features/lost-found/types";

const EMPTY_MULTILINGUAL: IMultilingualFormField = { en: "", lo: "", zh: "" };

const initialValues: ICreateLostFoundForm = {
  category: "",
  displayNames: { ...EMPTY_MULTILINGUAL },
  displayDescriptions: { ...EMPTY_MULTILINGUAL },
  displayLocations: { ...EMPTY_MULTILINGUAL },
  incidentDate: "",
  flightNumber: "",
  images: [],
};

function validate(values: ICreateLostFoundForm) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: any = {};

  if (!values.category) errors.category = "Category is required";

  if (!values.displayNames.en) {
    errors.displayNames = { en: "Item name (English) is required" };
  } else if (values.displayNames.en.length < 2) {
    errors.displayNames = { en: "At least 2 characters" };
  }

  if (!values.incidentDate) errors.incidentDate = "Incident date is required";

  return errors;
}

/** Fill any empty lo/zh with the English value so the server's
 *  MultilingualTextDto (requires all 3 non-empty) always passes. */
function fillMissing(field: IMultilingualFormField): IMultilingualFormField {
  return {
    en: field.en,
    lo: field.lo || field.en,
    zh: field.zh || field.en,
  };
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
      formData.append("category", values.category as LostFoundCategory);
      formData.append("displayNames", JSON.stringify(fillMissing(values.displayNames)));

      if (values.displayDescriptions.en)
        formData.append(
          "displayDescriptions",
          JSON.stringify(fillMissing(values.displayDescriptions)),
        );

      if (values.displayLocations.en)
        formData.append(
          "displayLocations",
          JSON.stringify(fillMissing(values.displayLocations)),
        );

      formData.append("incidentDate", values.incidentDate);
      if (values.flightNumber) formData.append("flightNumber", values.flightNumber);
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
