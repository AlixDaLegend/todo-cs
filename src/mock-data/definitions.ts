import { Scenarios } from "data-mocks";

export const scenarios: Scenarios = {
  "default": [
    {
      url: /mytodos\/all/,
      method: 'GET',
      response: [
        {
          id: 0,
          title: "Read the manual",
          description: "User should read the manual before asking question",
          done: false
        },{
          id: 1,
          title: "Contact Product Owner for roadmap",
          description: "PO has some question regarding the Epic.  Please contact her.",
          done: false
        },
        {
          id: 2,
          title: "Test dashboard lib patch",
          done: true
        },
        {
          id: 3,
          title: "Finalize geolocation UI",
          description: "Finish user story.",
          done: false
        }
      ],
      responseCode: 200,
      delay: 1000,
    },
  ]
};

