export interface CoreOutput {
  ok: boolean;
  error?: string;
}

interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}
interface LoginUserOutput extends CoreOutput {
  userId?: string;
}

interface MeetingLog {
  title: string;
  image: string;
}

interface FetchAllMeetingLogOutput extends CoreOutput {
  meetingLogs: MeetingLog[]
}