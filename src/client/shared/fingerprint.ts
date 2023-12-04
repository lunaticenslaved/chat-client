import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const fingerprint = {
  create() {
    return FingerprintJS.load()
      .then(fp => fp.get())
      .then(data => data.visitorId);
  },
};
