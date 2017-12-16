'use strict';


window.pinsFilters = (function () {
  // var pinFilters = document.querySelectorAll('.map__filter');
  var filteredTickets = [];
  // var price = {
  //
  // };

  function filterWithFeatures(tickets, value) {
    var filteredFeatures = tickets.filter(function (ticket) {
      return ticket.offer.features.indexOf(value) !== -1;
    });

    return filteredFeatures;
  }

  function filterTickets(advertismentTickets) {
    var checkedPinFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    filteredTickets = advertismentTickets.slice();
    var checkedFeatures = [];

    checkedPinFeatures.forEach(function (feature) {
      checkedFeatures.push(feature.value);
    });
    //
    // // appliedFilters.forEach(function (filter) {
    // //   filteredTickets = filterType[filter.type](filteredTickets, filter.value);
    // // });
    //
    checkedFeatures.forEach(function (value) {
      filteredTickets = filterWithFeatures(filteredTickets, value);
    });

    return filteredTickets;
  }

  return filterTickets;
})();
