'use strict';


window.filters = (function () {
  var LOW_PRICE = 10000;
  var MIDDLE_PRICE = 50000;
  var ANY_OPTION = 'any';
  var CHECKED_FEATURE_SELECTOR = '.map__filter-set input[type="checkbox"]:checked';

  var ticketFilters = Array.from(document.querySelectorAll('.map__filter'));
  var filterTypes = [filterWithType, filterWithPrice, filterWithRooms, filterWithGuests];
  var filteredTickets = [];

  var priceWeight = {
    low: function (price) {

      return price < LOW_PRICE;
    },

    middle: function (price) {

      return price >= LOW_PRICE && price < MIDDLE_PRICE;
    },

    high: function (price) {

      return price >= MIDDLE_PRICE;
    }
  };

  function filterWithType(tickets, value) {
    var filteredTicket = tickets.filter(function (ticket) {

      return ticket.offer.type === value;
    });

    return filteredTicket;
  }

  function filterWithPrice(tickets, value) {
    var filteredTicket = tickets.filter(function (ticket) {

      return priceWeight[value](ticket.offer.price);
    });

    return filteredTicket;
  }

  function filterWithRooms(tickets, value) {
    var filteredTicket = tickets.filter(function (ticket) {

      return ticket.offer.rooms.toString() === value;
    });

    return filteredTicket;
  }

  function filterWithGuests(tickets, value) {
    var filteredTicket = tickets.filter(function (ticket) {

      return ticket.offer.guests.toString() === value;
    });

    return filteredTicket;
  }

  function filterWithFeatures(tickets, value) {
    var filteredTicket = tickets.filter(function (ticket) {

      return ticket.offer.features.indexOf(value) !== -1;
    });

    return filteredTicket;
  }

  function getArrayFromElementsValue(elements) {
    var outputArray = [];
    elements.forEach(function (filter) {
      outputArray.push(filter.value);
    });

    return outputArray;
  }

  function enforce(advertismentTickets) {
    var checkedPinFeatures = Array.from(document.querySelectorAll(CHECKED_FEATURE_SELECTOR));
    var checkedFeatures = getArrayFromElementsValue(checkedPinFeatures);
    var filters = getArrayFromElementsValue(ticketFilters);

    filteredTickets = advertismentTickets.slice();

    checkedFeatures.forEach(function (value) {
      filteredTickets = filterWithFeatures(filteredTickets, value);
    });

    filters.forEach(function (filter, i) {

      if (filter !== ANY_OPTION) {
        filteredTickets = filterTypes[i](filteredTickets, filter);
      }
    });

    return filteredTickets;
  }

  return enforce;
})();
