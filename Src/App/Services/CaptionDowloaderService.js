const fs = require('fs');
const path = require('path');
const https = require('https');
const ytdl = require('ytdl-core');
const StringFunctions = require("../Utils/StringFunctions");

module.exports = {
    async downloadCaptionsFromYoutube(video_url) {
        var dir_name_and_file;

        const caption_path = ytdl.getInfo(video_url).then(async(info) => {
            const tracks = info
                .player_response.captions
                .playerCaptionsTracklistRenderer.captionTracks;

            if (tracks && tracks.length) {
                console.log('Found captions for', tracks.map(t => t.name.simpleText).join(', '));
                
                const track = tracks.find(t => t.languageCode === "pt");

                if (track) {
                    console.log('Retrieving captions:', track.name.simpleText);
                    console.log('URL', track.baseUrl);
        
                    const output = `${track.languageCode}.xml`;

                    var dir_path = path.resolve(
                        __dirname, '..', '..', '..', 
                        'caption_files', 'xml_files', 
                        `${await StringFunctions.toSnakeCase(info.videoDetails.title)}`
                    );

                    if (!fs.existsSync(dir_path)){
                        fs.mkdirSync(dir_path);
                        console.log("new directory has been created");
                    }
        
                    dir_name_and_file = `${dir_path}/${output}`;
                    console.log('Saving to', dir_name_and_file);

                    console.log(dir_name_and_file);
                    https.get(`${track.baseUrl}&fmt=xml`, res => {
                        res.pipe(fs.createWriteStream(path.resolve(dir_path, output)));
                    });
                } else {
                    console.log('Could not find captions for', "pt");
                }
            } else {
                console.log('No captions found for this video');
            }
        }).then(() => {
            return dir_name_and_file;
        });

        return caption_path;
    }
}