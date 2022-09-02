import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    SerializedError,
} from '@reduxjs/toolkit'
import { RoomType } from '../../types'
import { api } from '../../lib/api'

export interface RoomStateType {
    rooms: RoomType[]
    loading: boolean
    error: string | SerializedError
}

const initialState: RoomStateType = {
    rooms: [],
    loading: false,
    error: '',
}

export const fetchAllRooms = createAsyncThunk('fetchAllRooms', async () => {
    const res = await api.get('/all-rooms')
    return res.data
})

interface dataType {
    name: string
    user_id: string
    updated_date: Date
    created_date: Date
}

export const createRoom = createAsyncThunk(
    'createRoom',
    async ({ name, user_id, created_date, updated_date }: dataType) => {
        const res = await api.post('/room', {
            name,
            user_id,
            created_date,
            updated_date,
        })
        return res.data
    }
)

export const deleteRoom = createAsyncThunk('deleteRoom', async (id: string) => {
    const res = await api.delete(`/room/${id}`)
    return res.data
})

// @ts-ignore
const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        // non-async actions
        setRooms: (state, action: PayloadAction<RoomType[]>) => {
            state.rooms = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
            state.rooms = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchAllRooms.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(fetchAllRooms.rejected, (state, action) => {
            state.rooms = []
            state.loading = false
            state.error = action.error
        })
        builder.addCase(createRoom.fulfilled, (state, action) => {
            state.rooms = [action.payload, ...state.rooms]
            state.loading = false
            state.error = ''
        })
        builder.addCase(createRoom.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(createRoom.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
        builder.addCase(deleteRoom.fulfilled, (state, action) => {
            state.rooms = state.rooms.filter((room: RoomType) => {
                return room._id !== action.payload._id
            })
            state.loading = false
            state.error = ''
        })
        builder.addCase(deleteRoom.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(deleteRoom.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    },
})

export const { setRooms } = roomSlice.actions
export default roomSlice.reducer
