import { Scenarios } from "data-mocks";

export const scenarios: Scenarios = {
  "default": [
    {
      url: /mytodos\/all/,
      method: 'GET',
      response: [
        {
          title: "Contact Product Owner for roadmap",
          done: false
        },
        {
          title: "Test dashboard lib patch",
          done: true
        },
        {
          title: "Finalize geolocation UI",
          done: false
        }
      ],
      responseCode: 200,
      delay: 1000,
    },
  ]
};

