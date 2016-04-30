if(Planets.find({}).count() === 0) {
  Planets.insert({
    name: "Universe"
  });
  Planets.insert({
    name: "A100",
  });
}
