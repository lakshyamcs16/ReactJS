import { VIDEOS, IS_FIRST_VIDEO, SELECTED_VIDEO } from "./VideosTypes"

export const setFirstVideo = (isFirstVideo = true) => {
    return {
        type: IS_FIRST_VIDEO,
        payload: isFirstVideo
    }
}

export const setVideos = (setVideos = []) => {
    return {
        type: VIDEOS,
        payload: setVideos
    }
}

export const setSelectedVideo = (selectedVideo = null) => {
    return {
        type: SELECTED_VIDEO,
        payload: selectedVideo
    }
}

export const setupPlayer = (videos = [], selectedVideo = null, isFirstVideo = false, setPlayer) => {
    return (dispatch) => {
        dispatch(setVideos(videos));
        dispatch(setSelectedVideo(selectedVideo))
        dispatch(setFirstVideo(isFirstVideo))
        setPlayer(isFirstVideo, selectedVideo);
    }
}