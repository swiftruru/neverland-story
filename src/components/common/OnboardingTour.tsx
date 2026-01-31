'use client'

import { useEffect, useState, useCallback } from 'react'
import Joyride, { CallBackProps, STATUS, ACTIONS, EVENTS, Step } from 'react-joyride'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'

const STORAGE_KEY = 'onboarding-tour-completed'
const TOUR_VERSION = '1' // 更新版本號可強制重新顯示導覽

// 自訂樣式
const joyrideStyles = {
  options: {
    primaryColor: '#006850',
    zIndex: 10001,
    arrowColor: '#fff',
    backgroundColor: '#fff',
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    textColor: '#333',
  },
  tooltip: {
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  tooltipContainer: {
    textAlign: 'left' as const,
  },
  tooltipTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '8px',
  },
  tooltipContent: {
    fontSize: '0.95rem',
    lineHeight: 1.6,
  },
  buttonNext: {
    backgroundColor: '#006850',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  buttonBack: {
    color: '#666',
    marginRight: '8px',
  },
  buttonSkip: {
    color: '#999',
  },
  spotlight: {
    borderRadius: '12px',
  },
}

export function OnboardingTour() {
  const { t, ready } = useTranslation('common')
  const pathname = usePathname()
  const [run, setRun] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  // 只在首頁或 Neverland 首頁啟動導覽
  const isHomePage = pathname === '/' || pathname === '/neverland' || pathname === '/neverland/'

  // 檢查是否已完成導覽
  const hasCompletedTour = useCallback(() => {
    if (typeof window === 'undefined') return true
    const completed = localStorage.getItem(STORAGE_KEY)
    return completed === TOUR_VERSION
  }, [])

  // 標記導覽完成
  const markTourCompleted = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, TOUR_VERSION)
  }, [])

  // 導覽步驟
  const steps: Step[] = ready ? [
    {
      target: 'body',
      content: (
        <div>
          <h3 style={{ margin: '0 0 12px', color: '#006850' }}>
            {t('onboarding.welcome.title')}
          </h3>
          <p style={{ margin: 0 }}>
            {t('onboarding.welcome.content')}
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="bottom-nav"]',
      content: (
        <div>
          <h3 style={{ margin: '0 0 12px', color: '#006850' }}>
            {t('onboarding.navigation.title')}
          </h3>
          <p style={{ margin: 0 }}>
            {t('onboarding.navigation.content')}
          </p>
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
    },
    {
      target: '[data-tour="courses-link"]',
      content: (
        <div>
          <h3 style={{ margin: '0 0 12px', color: '#006850' }}>
            {t('onboarding.courses.title')}
          </h3>
          <p style={{ margin: 0 }}>
            {t('onboarding.courses.content')}
          </p>
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
    },
    {
      target: '[data-tour="language-switcher"]',
      content: (
        <div>
          <h3 style={{ margin: '0 0 12px', color: '#006850' }}>
            {t('onboarding.language.title')}
          </h3>
          <p style={{ margin: 0 }}>
            {t('onboarding.language.content')}
          </p>
        </div>
      ),
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: 'body',
      content: (
        <div>
          <h3 style={{ margin: '0 0 12px', color: '#006850' }}>
            {t('onboarding.complete.title')}
          </h3>
          <p style={{ margin: 0 }}>
            {t('onboarding.complete.content')}
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
  ] : []

  // 初始化：延遲顯示導覽
  useEffect(() => {
    if (!ready || !isHomePage || hasCompletedTour()) return

    // 等待頁面載入完成後再顯示
    const timer = setTimeout(() => {
      setRun(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [ready, isHomePage, hasCompletedTour])

  // 處理導覽事件
  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, action, index, type } = data

    // 更新步驟索引
    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
    }

    // 導覽結束（完成或跳過）
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false)
      markTourCompleted()
    }
  }, [markTourCompleted])

  if (!ready || !isHomePage || steps.length === 0) return null

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showSkipButton
      showProgress
      scrollToFirstStep
      disableOverlayClose
      disableScrolling={false}
      callback={handleJoyrideCallback}
      styles={joyrideStyles}
      locale={{
        back: t('onboarding.buttons.back'),
        close: t('onboarding.buttons.close'),
        last: t('onboarding.buttons.finish'),
        next: t('onboarding.buttons.next'),
        skip: t('onboarding.buttons.skip'),
      }}
      floaterProps={{
        disableAnimation: false,
      }}
    />
  )
}
