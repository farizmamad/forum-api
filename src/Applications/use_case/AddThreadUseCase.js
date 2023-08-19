const AddThread = require('../../Domains/threads/entities/AddThread.js');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(userId, useCasePayload) {
    const addThread = new AddThread({ ...useCasePayload, owner: userId });
    return this._threadRepository.addThread(addThread);
  }
}

module.exports = AddThreadUseCase;
