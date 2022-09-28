import axios, { AxiosResponse } from 'axios';

export async function calculateTwoAddressesDistance(
  firstAddress: string,
  secondAddress: string,
) {
  const firstAddressParsed = firstAddress.replace(' ', '+');
  const secondAddressParsed = secondAddress.replace(' ', '+');
  let firstAddressGeolocation: AxiosResponse;
  let secondAddressGeolocation: AxiosResponse;
  try {
    firstAddressGeolocation = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${firstAddressParsed}&key=${process.env.GOOGLE_API_KEY}`,
    );
    secondAddressGeolocation = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${secondAddressParsed}&key=${process.env.GOOGLE_API_KEY}`,
    );
  } catch (googleError) {
    console.error(googleError);
    return null;
  }

  const firstLatitude =
    firstAddressGeolocation.data.results[0].geometry.location.lat;
  const firstLongitude =
    firstAddressGeolocation.data.results[0].geometry.location.lng;

  const secondLatitude =
    secondAddressGeolocation.data.results[0].geometry.location.lat;
  const secondLongitude =
    secondAddressGeolocation.data.results[0].geometry.location.lng;

  const distanceInKm = getDistanceFromLatLonInKm(
    firstLatitude,
    firstLongitude,
    secondLatitude,
    secondLongitude,
  );
  return Math.floor(distanceInKm);
}

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
