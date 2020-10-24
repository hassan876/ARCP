import React, { useReducer } from 'react';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import axios from 'axios';
import {
    GET_COURSES,
    ADD_COURSE,
    UPDATE_COURSE,
    DELETE_COURSE,
    FILTER_COURSE,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_COURSES,
    COURSE_ERROR,
    CLEAR_COURSE_ERRORS
} from '../types';

const CourseState = props => {
    const initialState = {
        courses: [],
        loading: true
        , current: null,
        error: null,
    };

    const [state, dispatch] = useReducer(courseReducer, initialState);

    // getCourses
    const getCourses = async () => {

        try {
            const res = await axios.get('/api/courses');
            dispatch({ type: GET_COURSES, payload: res.data })
            return res;
        }
        catch (err) {
            console.log('errro in couse add course state js');
            return err;
        }

    }
    // clearContacts
    const clearCourses = () => {
        dispatch({ type: CLEAR_COURSES })
    }
    // Add Course
    const addCourse = async (course) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        try {
            const res = await axios.post('/api/courses', course, config);
            dispatch({ type: ADD_COURSE, payload: res.data });
            return res;

        }
        catch (err) {
            dispatch({
                type: COURSE_ERROR
            });
            return err;
        }

    }
    // delete Course
    const deleteCourse = async (id) => {
        try {
            const res = await axios.delete(`/api/courses/${id}`);

            dispatch({ type: DELETE_COURSE, payload: id })
            return res;

        } catch (err) {
            dispatch({
                type: COURSE_ERROR,
                payload: err.response.msg
            });
            return err;
        }
    }

    // update Course
    const updateCourse = async (course) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(
                `/api/courses/${course.id}`,
                course,
                config
            );

            dispatch({
                type: UPDATE_COURSE,
                payload: res.data
            });
            return res;
        } catch (err) {
            dispatch({
                type: COURSE_ERROR,
                payload: err.response.msg
            });
            return err;
        }
    }
    // Filter Course
    // setCurrentMethod
    const setCurrent = (course) => {
        dispatch({ type: SET_CURRENT, payload: course })
    }
    // CLEARCurrentMethod
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }
    const clearCourseError = () => {
        dispatch({ type: CLEAR_COURSE_ERRORS })
    }

    return (
        <CourseContext.Provider
            value={{
                courses: state.courses,
                current: state.current,
                loading: state.loading,
                error: state.error,
                courseadded: state.courseadded,
                serverResponseWating: state.serverResponseWating,
                getCourses,
                addCourse,
                updateCourse,
                deleteCourse,
                setCurrent,
                clearCurrent,
                clearCourses,
                clearCourseError
            }}
        >
            {props.children}
        </CourseContext.Provider>
    )

}
export default CourseState;