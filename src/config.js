const config = {};
config.api = {};

config.api.auth = "AUTH_KEY_FROM_INSTANCE";
config.api.contentType = "application/json";
//Api rest interna, debido a  falta de tiempo no me he parado a crear registro login etc...
// config.api.url = "http://localhost:3010";
// config.api.ingredients = "/ingredients/600ff00adb4dd302feada4a3";
// config.api.orders = "/orders";

// firebase
config.api.firebase = true;
config.api.url = "https://burger-3e456-default-rtdb.firebaseio.com";
config.api.orders = "/orders.json?auth=";
config.api.ordersUserId = (userId, token) => `${config.api.orders}${token}&orderBy="userId"&equalTo="${userId}"`;
config.api.ordersRemove = (id, token) => `/orders/${id}.json?auth=${token}`;
config.api.ingredients = "/ingredients.json";

export default config;
