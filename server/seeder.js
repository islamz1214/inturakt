if(Planets.find({}).count() === 0) {
  Planets.insert({
    name: "Universe",
    status: "public",
  });
  Planets.insert({
    name: "A100",
    status: "public",
  });
}
