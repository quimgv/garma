exports.update_many_requests_filters = body => {
  let filters = {};

  if (body.action === "declineRestOfRequests") {
    filters = {
      favour: body.favourId,
      _id: { $ne: body.requestId }
    };
  }

  return filters;
};
