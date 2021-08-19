/**
 * Return a Promise object with the rep logs data
 *
 * @return {Promise<Response>>}
 */
export function getRepLogs() {
    return fetch('/reps')
        .then(response => {
            return response.json();
        });
}