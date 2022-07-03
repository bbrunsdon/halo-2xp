// Fetch function to POST email address
export async function sendVerificationEmail(userEmail = '', entryGuid = '') {

    const data = { "email": userEmail }

    // Send email address
    const response = await fetch('https://www.lucozade.com/cgi-bin/app/instant-win-api.pl/send-verification-email', {
        method: 'POST',
        headers: {
            'X-Entry-Guid': entryGuid
        },
        body: JSON.stringify(data)
    });
    return await response.json();

};

// Fetch functions to POST entry data and GET prize
export async function getPrize(data = {}, entryGuid = '') {

    const headers = {
        'X-Entry-Guid': entryGuid,
        "X-Competition-Group": "primary",
        "X-Competition-Guid": "407dd5bb-c08d-11ec-97c3-2ea081ad199a"
    };

    const opocode = { "code": "4066" };
    const answers = { "answers": [{ "questionGuid": "cb70506e-c6cc-11ec-aa00-def30f344eb8", "answerGuid": "e6785d47-c6cf-11ec-96eb-36d66aa4cbd4" }] };

    // Send inital data
    await fetch('https://www.lucozade.com/cgi-bin/app/instant-win-api.pl/initial-data', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    // Send opocode
    await fetch('https://www.lucozade.com/cgi-bin/app/instant-win-api.pl/opocode', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(opocode)
    });

    // Send answers
    await fetch('https://www.lucozade.com/cgi-bin/app/instant-win-api.pl/answers', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(answers)
    });

    // Get prize!
    const response = await fetch('https://www.lucozade.com/cgi-bin/app/instant-win-api.pl/draw-entry-prizes', {
        headers: headers
    });

    // Perform Xbox draw (you never know...)
    await fetch('https://www.lucozade.com/cgi-bin/app/instant-win-api.pl/perform-draw', {
        headers: headers
    });

    // End entry
    await fetch('https://www.lucozade.com/cgi-bin/app/instant-win-api.pl/end-entry', {
        method: 'POST',
        headers: headers
    });

    return await response.json();

};