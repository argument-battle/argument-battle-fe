const postUpvote = async ({ argumentId }) => {
    const response = await fetch(`/api/arguments/${argumentId}`, {
        method: 'POST'
    });
    return await response.json();
};
export { postUpvote };
