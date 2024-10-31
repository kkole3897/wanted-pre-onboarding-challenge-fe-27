export function handleRegisterSuccess() {
  window.alert('계정이 성공적으로 생성되었습니다');
}

export function handleRegisterFail(message?: string) {
  window.alert(
    message ?? '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요'
  );
}
