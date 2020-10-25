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

export { postDebate };
