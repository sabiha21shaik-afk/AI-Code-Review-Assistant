def analyze_code(code):
    issues = []

    if "print(" in code:
        issues.append("Avoid using print statements in production code.")

    if "==" in code:
        issues.append("Check equality conditions carefully.")

    if len(code.strip()) < 10:
        issues.append("Code is too short for meaningful review.")

    if not issues:
        issues.append("No major issues found. Code looks good.")

    return issues