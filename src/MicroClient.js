// MicroClient.js
import loadable from "react-loadable";

// const BUNDLE_URL = 'https://where-your-bundles-are-stored'
const BUNDLE_URL = "https://localhost:4000";

const loadJS = (url, libName) => {
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.onerror = reject;
    script.onload = resolve;
    script.async = true;
    script.src = url;
    document.body.appendChild(script);
  });
  return promise.then(() => global[libName].default);
};
const loadCSS = (url) =>
  new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.onerror = reject;
    link.onload = resolve;
    link.type = "text/css";
    link.href = url;
    document.head.appendChild(link);
  });
const loadBundle = (clientName) => {
  let promiseChain = Promise.resolve();
  // In dev mode, CRA does not produce a separate CSS bundle
  if (process.env.NODE_ENV !== "development") {
    promiseChain = promiseChain.then(() =>
      loadCSS(`${BUNDLE_URL}/${clientName}/main.css`)
    );
  }
  promiseChain = promiseChain.then(() =>
    loadJS(`${BUNDLE_URL}/${clientName}/main.js`, clientName)
  );
  return promiseChain;
};
const MicroClient = ({ clientName, ...rest }) => {
  const LoadableClient = loadable({
    loader: () => loadBundle(clientName),
    loading: () => <div>Loading...</div>,
  });
  return <LoadableClient {...rest} />;
};
export default MicroClient;
