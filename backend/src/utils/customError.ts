class AppError extends Error {
  constructor(
    public message: string = "Internal Server Error",
    public status: number = 500
  ) {
    super();
  }
}

export default AppError;
