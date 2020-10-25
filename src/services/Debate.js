const postDebate = async ({ topic, debateClub, roundCount }) => {
    const response = await fetch('/api/debates', {
        method: 'POST',
        body: JSON.stringify({
            topic,
            participatingClubIds: [debateClub._id],
            roundCount
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

const getDebate = async ({ id }) => {
    const response = await fetch(`/api/debates/${id}`);
    return await response.json();
};

const joinTeam = async ({ debateId, teamId }) => {
    const response = await fetch(`/api/debates/${debateId}/teams/${teamId}`, {
        method: 'PUT'
    });
    return await response.json();
};

export { postDebate, getDebate, joinTeam };
