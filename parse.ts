import { Parser } from "json2csv"
import sample from "./sample.json"
import { writeFileSync } from "fs"

interface Business {
    name: string
    categories: string
    address: string
    postalCode: string
    avgRating: number
    reviewCount: number
    price: string
}
interface Review {
    rating: number
    timeCreated: string
    userId: string
}

interface BusinessReview extends Business, Review { }

function expand(business: typeof sample.data.search.business[0]) {
    const reviews: BusinessReview[] = []
    const baseBusiness: Business = {
        name: business.name,
        categories: business.categories.map(c => c.title).join(','),
        address: business.location.address1,
        postalCode: business.location.postal_code,
        avgRating: business.rating,
        reviewCount: business.review_count,
        price: business.price!
    }
    for (let review of business.reviews) {
        const newReview: BusinessReview = {
            ...baseBusiness,
            rating: review.rating,
            timeCreated: review.time_created,
            userId: review.user.id
        }
        reviews.push(newReview)
    }
    return reviews
}

const reviews: BusinessReview[] = []
for (let business of sample.data.search.business) {
    reviews.push(...expand(business))
}

const parser = new Parser({ flatten: true })
writeFileSync("./sample.csv", parser.parse(reviews))