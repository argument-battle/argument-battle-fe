const getDebateClubs = async () => {
    const response = await fetch(`/api/clubs`);
    return await response.json();
};

export { getDebateClubs };
