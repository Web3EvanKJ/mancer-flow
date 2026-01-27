import * as Yup from "yup";

export const CreateStreamSchema = Yup.object({
  recipient: Yup.string()
    .required("Recipient address is required")
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  ratePerMonth: Yup.number()
    .typeError("Must be a number")
    .positive("Must be greater than 0")
    .required("Monthly rate is required"),
  initialDeposit: Yup.number()
    .typeError("Must be a number")
    .positive("Must be greater than 0")
    .required("Initial deposit is required"),
  transferable: Yup.boolean(),
});
