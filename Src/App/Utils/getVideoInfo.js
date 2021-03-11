const ytdl = require('ytdl-core');

module.exports = {
    async getVideoInformation(url) {
        const video_info = await ytdl.getInfo(url);
        const info = video_info.videoDetails;

        return info;
    }
}