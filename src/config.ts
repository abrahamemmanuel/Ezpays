interface IConfig {
  port: string;
}

export const config = {
  port: process.env.PORT || "7654",
};