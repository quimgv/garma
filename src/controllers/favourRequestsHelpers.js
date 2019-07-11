exports.update_many_requests_filters = body => {
  let filters = {};

  if (body.action === "declineRestOfRequests") {
    filters = {
      favour: body.favourId,
      _id: { $ne: body.requestId }
    };
  }
  if(body.action === 'setUnreadRequestsAsRead') {
    filters = {
      _id: { $in: body.requestsId }
    }
  }

  return filters;
};
