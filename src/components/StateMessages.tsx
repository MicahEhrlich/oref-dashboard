import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'

const Centered = styled.div`
  text-align: center;
  padding: 80px 20px;
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  color: ${theme.colors.muted};
`

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Spinner = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid ${theme.colors.border};
  border-top-color: ${theme.colors.red};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin-bottom: 16px;
`

const ErrorMsg = styled.div`
  color: ${theme.colors.red};
  font-size: 13px;
  margin-bottom: 8px;
`

const ErrorDetail = styled.div`
  color: ${theme.colors.muted};
  font-size: 11px;
  max-width: 480px;
  margin: 0 auto 24px;
  line-height: 1.7;
`

const RetryBtn = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.red};
  color: ${theme.colors.red};
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  padding: 8px 20px;
  border-radius: ${theme.radius.sm};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(230, 57, 70, 0.1);
  }
`

export function LoadingState() {
  return (
    <Centered>
      <Spinner />
      <div>Fetching live alert data…</div>
    </Centered>
  )
}

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Centered>
      <ErrorMsg>⚠ Could not load data</ErrorMsg>
      <ErrorDetail>
        {message}
        <br />
        <br />
        The API may block cross-origin requests. Try running the dev server with a proxy, or use a
        browser CORS extension.
      </ErrorDetail>
      <RetryBtn onClick={onRetry}>↻ Try Again</RetryBtn>
    </Centered>
  )
}
