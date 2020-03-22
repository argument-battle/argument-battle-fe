const isLoggedIn = () => {
    const userToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)user_token\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
    );
    return !!userToken;
};
export { isLoggedIn };
