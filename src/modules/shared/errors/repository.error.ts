class RepositoryError extends Error {
  constructor(message: string, cause?: Error) {
    super(message, { cause });
    this.name = 'RepositoryError';
  }
}

export default RepositoryError;
