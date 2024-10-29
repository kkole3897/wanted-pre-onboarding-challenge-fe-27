import { type RegistrationData } from '../../model';

type RegistrationFormProps = {
  onSubmit: (data: typeof RegistrationData) => void;
}

export default function RegistrationForm() {
  return (
    <form>
      <div>
        <div>
          <label htmlFor="email">email *</label>
          <input type="email" id="email" name="email" placeholder="이메일" required />
        </div>
        <div>
          <label htmlFor="password">password *</label>
          <p>8자 이상의 비밀번호를 입력해주세요.</p>
          <input type="password" id="password" name="password" placeholder="비밀번호" required />
        </div>
        <div>
          <button type="submit" disabled>회원가입하기</button>
        </div>
      </div>
    </form>
  );
}
