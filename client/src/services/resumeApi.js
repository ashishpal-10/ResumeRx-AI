import api from "./api";

export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post(
    "/resume/upload",
    formData
  );

  return response.data;
};

export const analyzeResume = async (resumeId) => {
  const response = await api.post(
    `/reports/analyze/${resumeId}`
  );

  return response.data;
};