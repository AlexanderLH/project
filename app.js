const states = new Set()
const CityMap = {

    northernmost: function () {
        if (JSON.stringify(CityMap) === '{}') {
            alert(`Нет данных`);
        } else {
            let maxValueLatitude = 0;
            let nameOfCity = "";
            for (key in this) {
                if (this[key].latitude > maxValueLatitude) {
                    maxValueLatitude = this[key].latitude;
                    nameOfCity = this[key].city;
                }
            }

            document.getElementById("output-area").value += `Самый северный город: ${nameOfCity}\n`;
        }
    },

    southernmost: function () {
        if (JSON.stringify(CityMap) === '{}') {
            alert(`Нет данных`);
        } else {
            let minValueLatitude = 181;
            let nameOfCity = "";
            for (key in this) {
                if (this[key].latitude) {
                    if (this[key].latitude < minValueLatitude) {
                        minValueLatitude = this[key].latitude;
                        nameOfCity = this[key].city;
                    }
                }
            }

            document.getElementById("output-area").value += `Самый южный город: ${nameOfCity}\n`;
        }
    },

    westernmost: function () {
        if (JSON.stringify(CityMap) === '{}') {
            alert(`Нет данных`);
        } else {
            let minValueLongitude = 181;
            let nameOfCity = "";
            for (key in this) {
                if (this[key].longitude < minValueLongitude) {
                    minValueLongitude = this[key].longitude;
                    nameOfCity = this[key].city;
                }
            }

            document.getElementById("output-area").value += `Самый западный город: ${nameOfCity}\n`;
        }
    },

    easternmost: function () {
        if (JSON.stringify(CityMap) === '{}') {
            alert(`Нет данных`);
        } else {
            let minValueLongitude = -181;
            let nameOfCity = "";
            for (key in this) {
                if (this[key].longitude > minValueLongitude) {
                    minValueLongitude = this[key].longitude;
                    nameOfCity = this[key].city;
                }
            }

            document.getElementById("output-area").value += `Самый восточный город: ${nameOfCity}\n`;
        }
    },

    closestCity: function () {
        const distance = [];
        const cityname = [];
        const userLatitude = document.getElementById("userLatitude").value;
        const userLongitude = document.getElementById("userLongitude").value;
        let regexp = /\s|""/g;
        if ((!isFinite(+userLatitude) && !isFinite(+userLongitude)) || (isNaN(+userLongitude) || isNaN(+userLatitude)) || (regexp.test(userLatitude) || regexp.test(userLongitude) || userLatitude == '' || userLongitude == '')) {
            alert("Неверные координаты. Повторите попытку");
        } else if ((+userLatitude > 90) || (+userLatitude < -90) || (+userLongitude > 180) || (+userLongitude < -180)) {
            alert(`Значения долготы не могут быть больше 90 и меньше -90\nЗначения широты не могут быть больше 180 и меньше -180`);
        } else {

            for (let key in this) {

                cityname.push(CityMap[key].city);

                const latitude1 = this[key].latitude * Math.PI / 180
                const latitude2 = userLatitude * Math.PI / 180
                const longitude1 = this[key].longitude * Math.PI / 180
                const longitude2 = userLongitude * Math.PI / 180

                const cl1 = Math.cos(latitude1);
                const cl2 = Math.cos(latitude2);
                const sl1 = Math.sin(latitude1);
                const sl2 = Math.sin(latitude2);

                const delta = longitude2 - longitude1;
                const cdelta = Math.cos(delta);

                const result = Math.acos(sl1 * sl2 + cl1 * cl2 * cdelta) * 6372;
                distance.push(+result.toFixed(1));
            }

            let minValueCoordinate = distance[0];
            let minValue = 0;
            for (let i = 0; i < distance.length; i++) {
                if (distance[i] < minValueCoordinate) {
                    minValue = i;
                    minValueCoordinate = distance[i];
                }
            }

            document.getElementById("output-area").value += `Ближайший город: ${cityname[minValue]} - ${distance[minValue]} км\n`;
        }
    },

    list: function () {

        let resultString = "";
        document.getElementById("output-area").value += `Список штатов:\n`
        states.forEach((value, valueAgain, states) => {
            resultString += `${value} `;
        });

        document.getElementById("output-area").value += `${resultString.trim()}\n`;
    },

    listOfCities: function () {
        for (let key in this) {
            document.getElementById("output-area").value += `${CityMap[key].city}, ${CityMap[key].state}, ${CityMap[key].latitude}, ${CityMap[key].longitude}\n`;
        }
    },

    searchByState: function () {
        const userStateValue = document.getElementById('userState').value;

        if (isFinite(userStateValue) == true) {
            alert(`Введите название штата`)
            return 0;
        } else if (!states.has(userStateValue)) {
            alert(`Штата "${userStateValue}" нет в базе`);
        } else {
            document.getElementById("output-area").value += `Города штата ${userStateValue}:\n`;

            for (let key in this) {
                if (this[key].state == userStateValue) {
                    document.getElementById("output-area").value += `${this[key].city}\n`;
                }
            }
        }
    }
}

for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
        continue;
    }
    let temp = localStorage.getItem(key);
    temp = JSON.parse(temp);

    CityMap[key] = temp;
    states.add(CityMap[key].state);
}

Object.defineProperty(CityMap, "northernmost", {
    enumerable: false
});

Object.defineProperty(CityMap, "southernmost", {
    enumerable: false
});

Object.defineProperty(CityMap, "easternmost", {
    enumerable: false
});

Object.defineProperty(CityMap, "westernmost", {
    enumerable: false
});

Object.defineProperty(CityMap, "closestCity", {
    enumerable: false
});

Object.defineProperty(CityMap, "list", {
    enumerable: false
});

Object.defineProperty(CityMap, "searchByState", {
    enumerable: false
});

Object.defineProperty(CityMap, "listOfCities", {
    enumerable: false
});

function City(item) {

    arrayHelper = item.split(',');

    for (let i = 0; i < arrayHelper.length; i++) {
        if (arrayHelper[0] != false && arrayHelper[1] != false && isFinite(arrayHelper[2]) == true && isFinite(arrayHelper[3]) == true) {
            let currentCity = arrayHelper[0];
            this.city = arrayHelper[0];
            this.state = arrayHelper[1];
            this.latitude = +arrayHelper[2];
            this.longitude = +arrayHelper[3];
        } else {
            alert('Входные данные должны иметь вид: \nНазвание города, Штат, Широта, Долгота');
            break;
        }
    }
}

function getCity() {
    array2 = [];

    const city = document.getElementById("city-id").value;
    let textWithout = city.replace(/\n|"|\s+/g, "");

    if (textWithout[textWithout.length - 1] == ';') {
        textWithout = textWithout.slice(0, -1);
    }

    const array = textWithout.split(';');

    for (let i = 0; i < array.length; i++) {
        const arrayHelperItem = array[i].split(',');
        array2.push(arrayHelperItem);
    }

    for (let i = 0; i < array.length; i++) {
        let cities = new City(array[i]);
        if (JSON.stringify(cities) === '{}') {
            break;
        } else {
            let currentCity = array2[i][0];
            CityMap[currentCity] = cities;
            localStorage.setItem(currentCity, JSON.stringify(cities));
            states.add(CityMap[currentCity].state);
        }
    }

    document.getElementById('city-id').value = "";
}


