const createVideoMock = (element) => {
  if (element.type === `video`) {
    return element;
  }

  return null;
};

export {createVideoMock};
