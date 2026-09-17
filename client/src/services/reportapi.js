import api from "./api";

export const analyzeResume = async (resumeId) => {
  const response = await api.post(
    `/reports/analyze/${resumeId}`
  );

  return response.data;
};

export const getReports = async () => {
  const response = await api.get("/reports");

  return response.data;
};

export const getReportById = async (reportId) => {
  const response = await api.get(`/reports/${reportId}`);

  return response.data;
};

export const deleteReport = async (reportId) => {
  const response = await api.delete(`/reports/${reportId}`);

  return response.data;
};