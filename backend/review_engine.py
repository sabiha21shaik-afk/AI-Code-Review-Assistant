import re

def review_code(code):
    suggestions = []
    score = 100

    lines = code.split("\n")

    if len(lines) > 300:
        suggestions.append("File is too long. Consider splitting it into smaller modules.")
        score -= 10

    if "print(" in code:
        suggestions.append("Avoid leaving print() statements in production code.")
        score -= 5

    if "TODO" in code:
        suggestions.append("There are TODO comments that should be completed.")
        score -= 5

    if "pass" in code:
        suggestions.append("Found unfinished functions using 'pass'.")
        score -= 5

    if re.search(r"except\s*:", code):
        suggestions.append("Avoid using bare except statements.")
        score -= 10

    if "eval(" in code:
        suggestions.append("Avoid using eval() because it can be unsafe.")
        score -= 15

    if len(suggestions) == 0:
        suggestions.append("Great job! No major issues detected.")

    return {
        "score": max(score, 0),
        "suggestions": suggestions
    }