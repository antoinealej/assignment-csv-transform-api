import csvtojson from "csvtojson";

const csvHelper = {
  csvtojson(csvContent: string) {
    return csvtojson().fromString(csvContent);
  },
};

export default csvHelper;
