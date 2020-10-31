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
        method: 'POST'
    });
    return await response.json();
};

const postArgument = async ({ content, debateId }) => {
    const response = await fetch(`/api/debates/${debateId}/arguments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

const getCurrentRoundArguments = async ({ debateId }) => {
    const response = await fetch(
        `/api/debates/${debateId}/rounds/current/arguments`
    );
    return await response.json();
};

const getAllDebates = async (params = {}) => {
    var query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    const response = await fetch(`/api/debates${query ? `?${query}` : ''}`);
    return await response.json();
};

export {
    postDebate,
    getDebate,
    joinTeam,
    postArgument,
    getCurrentRoundArguments,
    getAllDebates
};
