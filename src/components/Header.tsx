import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'

interface HeaderProps {
  latestDate: string
  onRefetch: () => void
  loading: boolean
}

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.6); }
  50%       { box-shadow: 0 0 0 12px rgba(230, 57, 70, 0); }
`

const Wrapper = styled.header`
  padding: 32px 0 40px;
  border-bottom: 1px solid ${theme.colors.border};
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Badge = styled.div`
  width: 44px;
  height: 44px;
  background: ${theme.colors.red};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
  animation: ${pulse} 2s infinite;
`

const Title = styled.h1`
  font-family: ${theme.fonts.mono};
  font-size: clamp(15px, 2.5vw, 20px);
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.3;

  span {
    color: ${theme.colors.red};
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const MetaText = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  color: ${theme.colors.muted};
  text-align: right;
`

const RefreshBtn = styled.button<{ $loading: boolean }>`
  background: transparent;
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.muted};
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  padding: 6px 12px;
  border-radius: ${theme.radius.sm};
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  opacity: ${p => (p.$loading ? 0.5 : 1)};

  &:hover:not(:disabled) {
    border-color: ${theme.colors.red};
    color: ${theme.colors.red};
  }
`

export function Header({ latestDate, onRefetch, loading }: HeaderProps) {
  return (
    <Wrapper>
      <Left>
        <Badge>🚨</Badge>
        <Title>
          Home Front Command
          <br />
          <span>Alert Intelligence Dashboard</span>
        </Title>
      </Left>
      <Right>
        {latestDate && (
          <MetaText>
            Latest alert
            <br />
            {latestDate}
          </MetaText>
        )}
        <RefreshBtn onClick={onRefetch} disabled={loading} $loading={loading}>
          {loading ? 'Loading…' : '↻ Refresh'}
        </RefreshBtn>
      </Right>
    </Wrapper>
  )
}
