const data = [
  { Month: "January", Viewed: -400, NotViewed: -400 },
  { Month: "February", Viewed: 1000, NotViewed: -100 },
  { Month: "March", Viewed: 600, NotViewed: -300 },
  { Month: "April", Viewed: 380, NotViewed: -150 },
  { Month: "May", Viewed: 200, NotViewed: 100 },
  { Month: "June", Viewed: 0, NotViewed: -200 },
  { Month: "July", Viewed: 600, NotViewed: 250 },
];

export const useSessionActivity = () => {

  return {
    sessionActivityData : data
  }

}