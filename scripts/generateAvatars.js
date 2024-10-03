const generateValues = () => {
  let values = [];

  for (let i = 0; i < 8; i++) {
    const value = Math.floor(Math.random() * 49);

    const postFix = avatarSeeds[value];

    // Check if the value is already in the array
    if (values.find((v) => v.postFix === postFix)) {
      i--;
      continue;
    }

    values.push({
      value: i,
      link: `./assets/dicebear_avatars/${postFix}.png`,
      postFix,
    });
  }

  // copy each value twice
  values = [...values, ...values];

  // Shuffle the values
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }

  return values;
};
