import * as core from '@actions/core';
import * as JobStatus from './status';
import * as GoogleChat from './chat';

async function run() {
  try {
    const name = core.getInput('name', { required: true });
    const url = core.getInput('url', { required: true });
    const status = JobStatus.parse(core.getInput('status', { required: true }));
    const openCheckUrl = core.getInput('open_check_url', { required: true });

    core.debug(`input params: name=${name}, status=${status}, url=${url}, open_check_url=${openCheckUrl}`);

    await GoogleChat.notify(name, url, status, openCheckUrl);
    console.info('Sent message.')
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else if (typeof error === 'string') {
      core.setFailed(error);
    } else {
      core.setFailed('unexpected error');
    }
  }
}

run();
