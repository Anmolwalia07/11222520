import axios from "axios";

const LOG_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

export const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      LOG_ENDPOINT,
      {
        stack,
        level,
        package: pkg,
        message
      }
    );
  } catch (err) {
    console.error("[LOGGING FAILED]", err.response?.data || err.message);
  }
};
